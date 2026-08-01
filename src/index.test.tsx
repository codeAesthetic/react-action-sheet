import * as React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import Actionsheet from '.'
import { STYLE_ELEMENT_ID } from './injectStyles'

const menus = ['Modes', 'Profile', 'Settings']

const noop = () => undefined

afterEach(cleanup)

const styleTags = () =>
  document.head.querySelectorAll(`style#${STYLE_ELEMENT_ID}`)

describe('Actionsheet', () => {
  it('renders every menu item', () => {
    render(
      <Actionsheet visible menus={menus} onClick={noop} onRequestClose={noop} />
    )

    menus.forEach((label) => expect(screen.getByText(label)).toBeVisible())
  })

  it('hands onClick a number, not the raw data-id string', () => {
    const onClick = vi.fn()
    render(
      <Actionsheet
        visible
        menus={menus}
        onClick={onClick}
        onRequestClose={noop}
      />
    )

    fireEvent.click(screen.getByText('Settings'))

    expect(onClick).toHaveBeenCalledWith(2)
    expect(typeof onClick.mock.calls[0][0]).toBe('number')
  })

  it('closes from the backdrop and from the cancel button', () => {
    const onRequestClose = vi.fn()
    const { container } = render(
      <Actionsheet
        visible
        showCancelButton
        cancelText='Dismiss'
        menus={menus}
        onClick={noop}
        onRequestClose={onRequestClose}
      />
    )

    fireEvent.click(container.querySelector('.ras-backdrop') as Element)
    fireEvent.click(screen.getByText('Dismiss'))

    expect(onRequestClose).toHaveBeenCalledTimes(2)
  })

  it('defaults the cancel label and omits the button unless asked', () => {
    const { rerender } = render(
      <Actionsheet visible menus={menus} onClick={noop} onRequestClose={noop} />
    )
    expect(screen.queryByText('Cancel')).toBeNull()

    rerender(
      <Actionsheet
        visible
        showCancelButton
        menus={menus}
        onClick={noop}
        onRequestClose={noop}
      />
    )
    expect(screen.getByText('Cancel')).toBeVisible()
  })

  describe('style injection', () => {
    it('injects the stylesheet without any CSS import from the consumer', () => {
      render(
        <Actionsheet
          visible
          menus={menus}
          onClick={noop}
          onRequestClose={noop}
        />
      )

      const tags = styleTags()
      expect(tags).toHaveLength(1)
      expect(tags[0].textContent).toContain('.ras-actionsheet')
      expect(tags[0].textContent).toContain('--ras-bg')
    })

    it('ships hover states gated behind a hover-capable pointer', () => {
      render(
        <Actionsheet
          visible
          menus={menus}
          onClick={noop}
          onRequestClose={noop}
        />
      )

      // jsdom cannot evaluate :hover, so assert the rules are present rather
      // than their effect. The media query matters: without it, tapping on a
      // touch device leaves the highlight stuck on the item.
      const css = styleTags()[0].textContent as string
      expect(css).toContain('@media (hover: hover)')
      expect(css).toContain('.ras-menu-item:hover')
      expect(css).toContain('.ras-cancel-btn:hover')
    })

    it('injects once no matter how many sheets are mounted', () => {
      render(
        <>
          <Actionsheet
            visible
            menus={menus}
            onClick={noop}
            onRequestClose={noop}
          />
          <Actionsheet
            visible={false}
            menus={menus}
            onClick={noop}
            onRequestClose={noop}
          />
        </>
      )

      expect(styleTags()).toHaveLength(1)
    })
  })

  describe('theming', () => {
    it('maps each color prop onto its custom property', () => {
      const { container } = render(
        <Actionsheet
          visible
          menus={menus}
          onClick={noop}
          onRequestClose={noop}
          backgroundColor='#111'
          textColor='#eee'
          cancelTextColor='#0f0'
          overlayColor='rgba(0, 0, 255, 0.4)'
        />
      )

      const root = container.querySelector('.ras-actionsheet') as HTMLElement
      expect(root.style.getPropertyValue('--ras-bg')).toBe('#111')
      expect(root.style.getPropertyValue('--ras-text')).toBe('#eee')
      expect(root.style.getPropertyValue('--ras-cancel-text')).toBe('#0f0')
      expect(root.style.getPropertyValue('--ras-overlay')).toBe(
        'rgba(0, 0, 255, 0.4)'
      )
    })

    it('leaves unset colors to the stylesheet defaults', () => {
      const { container } = render(
        <Actionsheet
          visible
          menus={menus}
          onClick={noop}
          onRequestClose={noop}
          textColor='#eee'
        />
      )

      const root = container.querySelector('.ras-actionsheet') as HTMLElement
      expect(root.style.getPropertyValue('--ras-text')).toBe('#eee')
      expect(root.style.getPropertyValue('--ras-bg')).toBe('')
    })
  })

  it('toggles the visibility class', () => {
    const { container, rerender } = render(
      <Actionsheet
        visible={false}
        menus={menus}
        onClick={noop}
        onRequestClose={noop}
      />
    )
    expect(container.querySelector('.ras-actionsheet')).not.toHaveClass(
      'ras-show'
    )

    rerender(
      <Actionsheet visible menus={menus} onClick={noop} onRequestClose={noop} />
    )
    expect(container.querySelector('.ras-actionsheet')).toHaveClass('ras-show')
  })
})

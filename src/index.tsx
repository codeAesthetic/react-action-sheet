import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  onRequestClose: () => void
  onClick: (i: number) => void
  cancelText: string
  visible: boolean
  menus: string[]
  showCancelButton: boolean
}

const Actionsheet = (props: Props) => {
  const {
    onRequestClose,
    cancelText,
    menus,
    visible,
    showCancelButton,
    onClick
  } = props

  const handleClick = (e: any) => onClick(e.target.getAttribute('data-id'))

  return (
    <div className={[styles.actionsheet, visible ? styles.show : ''].join(' ')}>
      {/* backdrop is blur black background sheet behind our content */}
      {visible ? (
        <div onClick={onRequestClose} className={styles.backdrop} />
      ) : null}
      <div className={styles.wrap}>
        <div className={styles.menu}>
          {menus.map((text: any, i: number) => {
            // Passing index in each item to perform any specific operation in-terms of indices of menu */
            return (
              <div
                key={i}
                className={styles['menu-item']}
                data-id={i}
                onClick={handleClick}
              >
                {text}
              </div>
            )
          })}
        </div>
        {/* Manual btn to show cancel button if needed */}
        {showCancelButton ? (
          <div className={styles.cancel}>
            <div className={styles['cancel-btn']} onClick={onRequestClose}>
              {cancelText}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

// Default values for props incase nothing is passed
Actionsheet.defaultProps = {
  cancelText: 'Cancel',
  menus: []
}

export default Actionsheet

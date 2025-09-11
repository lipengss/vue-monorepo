// src/composables/useSound.js
export function useSound() {
  /**
   * 播放音效
   * @param {string} src - 音效路径 (建议放在 public/ 目录下，比如 /click.mp3)
   * @param {boolean} allowOverlap - 是否允许重叠播放（默认 true）
   */
  const playSound = (src, allowOverlap = true) => {
    if (!src) return

    if (allowOverlap) {
      // 克隆一个新的 Audio 对象，避免快速点击时被打断
      const audio = new Audio(src)
      audio.play()
    } else {
      // 单实例模式
      if (!window.__audioMap) window.__audioMap = {}
      if (!window.__audioMap[src]) {
        window.__audioMap[src] = new Audio(src)
      }
      const audio = window.__audioMap[src]
      audio.currentTime = 0
      audio.play()
    }
  }

  return { playSound }
}

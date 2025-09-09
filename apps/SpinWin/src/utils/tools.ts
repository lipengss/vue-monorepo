/**
 * 根据权重随机选择数组索引
 * @param {number[]} weights - 权重数组，如 [10, 20, 30, 10, 5]
 * @returns {number} 被选中的数组索引
 */
function weightedRandom(weights) {
  // 1. 计算权重总和
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

  // 2. 生成一个随机数（0到总权重之间）
  const random = Math.random() * totalWeight

  // 3. 遍历权重数组，确定随机数落在哪个区间
  let currentWeight = 0
  for (let i = 0; i < weights.length; i++) {
    currentWeight += weights[i]
    if (random < currentWeight) {
      return i
    }
  }

  // 如果由于浮点数精度问题没有返回，返回最后一个索引
  return weights.length - 1
}

export { weightedRandom }

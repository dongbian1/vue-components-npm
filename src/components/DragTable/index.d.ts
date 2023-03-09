/**
 * 表格列的配置
 */
export interface Columns {
  /**
   * 列名
   */
  title: string

  /**
   * 数据key值
   */
  key: string

  /**
   * 格式化函数
   * @param row 当前行的值
   * @returns string
   */
  formatter?: (row: any) => string

  /**
   * 渲染函数
   * @param row 当前行的值
   * @returns JSX.Element
   */
  render?: (row: any) => JSX.Element
}

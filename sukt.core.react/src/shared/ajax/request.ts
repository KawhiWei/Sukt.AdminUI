import { PaginationProps } from "antd/lib/pagination";

export class initPaginationConfig {
  current: number = 1;
  pageSize: number = 10;
  defaultCurrent: number = 1;
  defaultPageSize: number = 10;
  showSizeChanger: boolean = true;
  showQuickJumper: boolean = true;
  total: number = 0;
};
/**
 * 统一处理表格分页器默认属性
 */
 export const  tacitPagingProps: PaginationProps = {
  style: { padding: '10px 0 0', textAlign: 'center', float: 'none', marginBottom: 10 },
  showSizeChanger: true,
  showQuickJumper: true
};
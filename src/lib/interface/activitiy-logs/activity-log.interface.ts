import { MetaInterface } from "../meta.interface";

export interface ActivityLogsInterface {
  activity_logs_id: string;
  type: string;
  decription?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export interface ActivityLogEdge {
  node: ActivityLogsInterface;
  cursor: string;
}

export interface ActivityLogPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ActivityLogsData {
  edges: ActivityLogEdge[];
  pageInfo: ActivityLogPageInfo;
  totalCount: number;
  timestamp: string;
  success: boolean;
}

export interface ActivityLogsInterfaceResult {
  meta: MetaInterface;
  data: ActivityLogsData;
}

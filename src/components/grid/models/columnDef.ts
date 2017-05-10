export class ColumnDef {
  fieldName: string;
  width?: number;
  headerTitle?: string;
  title?: string;
  template?: string;
  sortable?: 'asc' | 'desc';
  centered? = false;
}

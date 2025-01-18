export enum ActionsType {
  SetCell,
  SetCompleted,
}

export type Action = {
  action: ActionsType.SetCell;
  boardRow: number;
  boardCol: number;
  row: number;
  col: number;
};

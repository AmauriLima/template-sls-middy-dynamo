export interface IUseCase<Params extends Record<string, any>, Result = Record<string, any>> {
  execute(params: Params): Promise<Result>;
}

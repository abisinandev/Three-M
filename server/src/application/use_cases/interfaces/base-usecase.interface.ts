export interface IBaseUseCase<IRequest, IResponse> {
  execute(req: IRequest): Promise<IResponse>;
}

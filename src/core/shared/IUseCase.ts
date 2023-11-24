export default interface IUseCase<IN, OUT> {
    execute(props: IN): OUT
}
export abstract class Builder<Input = unknown, Output = unknown> {
	protected abstract $input: Input;

	abstract build(): Output;

	getProps(): Input {
		return this.$input;
	}
}

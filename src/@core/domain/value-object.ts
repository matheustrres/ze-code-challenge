type ValueObjectProps = {
	[key: string]: unknown;
};

export abstract class ValueObject<Props extends ValueObjectProps> {
	props: Props;

	constructor(props: Props) {
		this.props = props;
	}

	equals(vo?: ValueObject<Props>): boolean {
		if (!vo || !vo.props) {
			return false;
		}

		return JSON.stringify(this.props) === JSON.stringify(vo.props);
	}
}

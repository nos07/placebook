type EmojiProps = React.HTMLAttributes<HTMLSpanElement> & {
	label?: string;
	symbol: any;
};

export const Emoji = ({ label, symbol, ...props }: EmojiProps): JSX.Element => (
	<span
		className="emoji"
		role="img"
		aria-label={label || ``}
		aria-hidden={label ? `false` : `true`}
		{...props}
	>
		{symbol}
	</span>
);

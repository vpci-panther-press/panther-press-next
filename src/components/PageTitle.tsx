import { DynLogo } from "./DynLogo"

type Props = {
	title: string
}

export function PageTitle({ title }: Props) {
	return (
		<div className="title flex items-center justify-start gap-2">
			<DynLogo />
			<h1 className="text-4xl font-bold capitalize md:text-6xl">{title}</h1>
		</div>
	)
}

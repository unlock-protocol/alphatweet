interface Props {
  subTitle?: string;
  title: string;
}

export function Header({ subTitle, title }: Props) {
  return (
    <header className="space-y-2">
      <h1 className="text-xl font-semibold text-brand-blue">{title}</h1>
      {subTitle && <p className="text-gray-400">{subTitle}</p>}
    </header>
  );
}

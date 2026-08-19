import React from 'react';

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isRtl = params?.lang === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="w-full">
      {children}
    </div>
  );
}


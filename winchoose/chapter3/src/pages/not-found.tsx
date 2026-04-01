const NotFound = () => {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
        404 Error
      </p>
      <h1 className="mt-4 text-4xl font-bold text-zinc-900">
        찾을 수 없는 페이지예요.
      </h1>
      <p className="mt-4 text-base text-zinc-600">
        주소를 다시 확인하거나 상단 네비게이션에서 원하는 페이지로 이동해
        주세요.
      </p>
    </section>
  );
};

export default NotFound;

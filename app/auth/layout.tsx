function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-foreground to-secondary-foreground">
      {children}
    </div>
  );
}
export default layout;

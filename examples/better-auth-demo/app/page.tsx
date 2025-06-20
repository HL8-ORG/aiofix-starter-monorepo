import { Button } from '@repo/design-system/components/ui/button';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <h1>Hello World</h1>
      <Button>Click me</Button>
      <ModeToggle />
    </div>
  );
}

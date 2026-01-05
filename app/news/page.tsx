import { GoldNewsSection } from '../components/ui/GoldNewsSection';

export default function NewsPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <GoldNewsSection maxItems={15} showFilters={true} />
    </div>
  );
}

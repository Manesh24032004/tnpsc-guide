import { BookOpen, ScrollText, ClipboardList } from 'lucide-react';
import { Card } from '@/components/ui/card';

const syllabusItems = [
  {
    title: 'G-1 Syllabus',
    subtitle: 'Click to view PDF',
    icon: BookOpen,
    grade: 'G-1'
  },
  {
    title: 'G-2 Syllabus', 
    subtitle: 'Click to view PDF',
    icon: ScrollText,
    grade: 'G-2'
  },
  {
    title: 'G-IV Syllabus',
    subtitle: 'Click to view PDF', 
    icon: ClipboardList,
    grade: 'G-IV'
  }
];

export const SyllabusSection = () => {
  const handleSyllabusClick = (grade: string) => {
    // Handle PDF viewing/download
    console.log(`Opening ${grade} syllabus`);
    // TODO: Implement PDF viewer/download functionality
  };

  return (
    <section className="animate-slide-up">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">
        Explore Syllabus
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {syllabusItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card 
              key={item.grade}
              className="p-6 cursor-pointer transition-all duration-300 hover:shadow-elegant hover:scale-105 hover:border-secondary border-2 border-accent/30 group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleSyllabusClick(item.grade)}
            >
              <div className="flex items-center gap-4 p-2 border-b border-muted pb-4 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
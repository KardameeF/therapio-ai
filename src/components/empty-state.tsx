import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  illustration?: ReactNode;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  illustration 
}: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="space-y-6 animate-in fade-in duration-500">
          {illustration && (
            <div className="mx-auto w-32 h-32 text-foreground-muted/30">
              {illustration}
            </div>
          )}
          
          <div className="space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-foreground-muted max-w-sm mx-auto">
              {description}
            </p>
          </div>

          {action && (
            <Button onClick={action.onClick} variant="outline">
              {action.label}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
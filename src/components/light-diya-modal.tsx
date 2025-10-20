'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles } from 'lucide-react';

import { DiyaSchema, type DiyaFormValues } from '@/lib/schema';
import { addDiya } from '@/app/actions/diya';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type LightDiyaModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LightDiyaModal({ isOpen, onOpenChange }: LightDiyaModalProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<DiyaFormValues>({
    resolver: zodResolver(DiyaSchema),
    defaultValues: {
      name: '',
      message: '',
      html_path: '',
      pr_url: '',
    },
  });

  const onSubmit = (values: DiyaFormValues) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });
      
      const result = await addDiya(formData);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.error,
        });
      } else {
        toast({
          title: '✨ Your Diya is Lit!',
          description: `${result.name} just brightened up the celebration.`,
        });
        form.reset();
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card border-accent/50">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-accent" />
            Light Your Diya
          </DialogTitle>
          <DialogDescription>
            Share your creation with the community. Fill out the details below to add your diya to the grid.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ada Lovelace" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Festive Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Happy Diwali!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="html_path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HTML Path</FormLabel>
                  <FormControl>
                    <Input placeholder="your-github-username/your-file.html" {...field} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="pr_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub PR URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/..." {...field} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Lighting...
                  </>
                ) : (
                  'Light It Up!'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

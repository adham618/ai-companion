"use client";

import { Category, Companion } from "@prisma/client";

import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

type CompanionFormProps = {
  companion: Companion | null;
  categories: Category[];
};

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(2, {
      message: "Name must be at least 2 characters long.",
    }),
  description: z
    .string({
      required_error: "Description is required.",
    })
    .min(2, {
      message: "Description must be at least 2 characters long.",
    }),
  instructions: z
    .string({
      required_error: "Instructions is required.",
    })
    .min(200, {
      message: "Instructions must be at least 200 characters long.",
    }),
  seed: z
    .string({
      required_error: "Seed is required.",
    })
    .min(200, {
      message: "Seed must be at least 200 characters long.",
    }),
  src: z
    .string({
      required_error: "Image is required.",
    })
    .min(1, {
      message: "Image is required.",
    }),
  categoryId: z
    .string({
      required_error: "Category is required.",
    })
    .min(2, {
      message: "Category must be at least 2 characters long.",
    }),
});

export default function CompanionForm({
  companion,
  categories,
}: CompanionFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: companion?.name || "",
      description: companion?.description || "",
      instructions: companion?.instructions || "",
      seed: companion?.seed || "",
      src: companion?.src || "",
      categoryId: companion?.categoryId || undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (companion) {
        // Update companion
        await axios.patch(`/api/companion/${companion.id}`, values);
      } else {
        // Create companion
        await axios.post("/api/companion", values);
      }
      toast({
        description: "Companion saved successfully.",
      });
      router.refresh();
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    }
  }
  return (
    <div className="mx-auto max-w-4xl space-y-2 p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="w-full space-y-2">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your companion. This information will
                be displayed publicly.
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      type="text"
                      {...field}
                      placeholder="Elon Musk"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    The name of your AI companion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      type="text"
                      {...field}
                      placeholder="CEO & Founder of SpaceX and Tesla"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    A short description of your AI companion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <ScrollArea>
                          <div className="max-h-[150px]">
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </div>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    The category your AI companion belongs to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full space-y-2">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Configuration settings for your AI companion.
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none bg-background"
                    rows={7}
                    {...field}
                    placeholder={PREAMBLE}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Instructions for interacting with your AI companion.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none bg-background"
                    rows={7}
                    {...field}
                    placeholder={SEED_CHAT}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Example conversation to seed your AI companion.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-center">
            <Button size="lg" type="submit" disabled={isLoading}>
              {companion ? "Update your Companion" : "Create your Companion"}
              <Wand2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

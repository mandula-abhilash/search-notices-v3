"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  LOCATIONS,
  UNIVERSITY_TYPES,
  ACCREDITATIONS,
} from "@/types/universities";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  location: z.string(),
  type: z.string(),
  ranking: z.string().transform(Number),
  accreditation: z.array(z.string()),
  established: z.string().transform(Number),
  website: z.string().url(),
  image: z.string().url(),
  description: z.string().min(10).max(500),
  highlights: z.object({
    students: z.string().transform(Number),
    faculty: z.string().transform(Number),
    researchPapers: z.string().transform(Number),
    placement: z.string().transform(Number),
  }),
});

interface UniversityFormProps {
  onSuccess: () => void;
  initialData?: z.infer<typeof formSchema>;
}

export function UniversityForm({ onSuccess, initialData }: UniversityFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      location: "",
      type: "",
      ranking: "",
      accreditation: [],
      established: "",
      website: "",
      image: "",
      description: "",
      highlights: {
        students: "",
        faculty: "",
        researchPapers: "",
        placement: "",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // API call will be implemented here
      console.log(values);
      toast.success("University saved successfully!");
      onSuccess();
    } catch (error) {
      toast.error("Failed to save university");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter university name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select university type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {UNIVERSITY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="ranking"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ranking</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter ranking"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="established"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Established Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter established year"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Enter website URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Enter image URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter university description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Highlights</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="highlights.students"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Students</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of students"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="highlights.faculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Faculty</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of faculty"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="highlights.researchPapers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Papers</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of research papers"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="highlights.placement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placement Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter placement rate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => onSuccess()}>
            Cancel
          </Button>
          <Button type="submit">Save University</Button>
        </div>
      </form>
    </Form>
  );
}
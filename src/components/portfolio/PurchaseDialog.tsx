import { useEffect, useMemo, useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, CheckCircle2, Copy, ImagePlus, Loader2, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MagneticButton } from '@/components/lab/MagneticButton';
import { cn } from '@/lib/utils';
import { formatInr, usdToInr } from '@/data/projects';
import { submitSiteForm } from '@/lib/submitForm';
import type { Project } from '@/types';

const purchaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name is required' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Enter a valid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
  contactNumber: z
    .string()
    .trim()
    .min(8, { message: 'Contact number is required' })
    .max(20, { message: 'Contact number is too long' })
    .regex(/^[+\d\s()-]+$/, { message: 'Enter a valid contact number' }),
  screenshot: z
    .instanceof(File, { message: 'Payment screenshot is required' })
    .refine((f) => f.type.startsWith('image/'), { message: 'Only image files are accepted' })
    .refine((f) => f.size <= 8 * 1024 * 1024, { message: 'Image must be under 8MB' }),
});

type PurchaseFormValues = z.infer<typeof purchaseSchema>;

const UPI_ID = 'arunchitragar@slc';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
};

export function PurchaseDialog({ open, onOpenChange, project }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const priceUsd = project.priceUsd ?? 99;
  const amountInr = usdToInr(priceUsd);

  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      contactNumber: '',
      screenshot: undefined,
    },
  });

  const screenshot = form.watch('screenshot');
  const values = form.watch();

  const isComplete = useMemo(() => {
    return Boolean(
      values.name?.trim() &&
        values.email?.trim() &&
        values.contactNumber?.trim() &&
        values.screenshot instanceof File &&
        form.formState.isValid
    );
  }, [values, form.formState.isValid]);

  useEffect(() => {
    if (!(screenshot instanceof File)) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(screenshot);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [screenshot]);

  useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => {
        form.reset();
        setIsSuccess(false);
        setIsSubmitting(false);
        setDragActive(false);
        setPreviewUrl(null);
        setCopied(false);
      }, 200);
      return () => window.clearTimeout(t);
    }
  }, [open, form]);

  const assignFile = (file: File | undefined) => {
    if (!file) return;
    form.setValue('screenshot', file, { shouldValidate: true, shouldDirty: true });
  };

  const onFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    assignFile(e.target.files?.[0]);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) assignFile(file);
  };

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = async (data: PurchaseFormValues) => {
    setIsSubmitting(true);
    try {
      await submitSiteForm(
        {
          form: 'Indicator Purchase',
          indicator: project.title,
          slug: project.slug,
          priceUsd: `$${priceUsd}`,
          amountInr: `₹${formatInr(amountInr)}`,
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          screenshot: data.screenshot,
        },
        `Purchase: ${project.title} — ${data.name}`
      );
      setIsSuccess(true);
    } catch {
      form.setError('root', {
        message: 'Failed to send payment details. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto border-border bg-background sm:rounded-2xl">
        {isSuccess ? (
          <div className="space-y-5 py-2 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <CheckCircle2 className="size-7 text-primary" />
            </div>
            <DialogHeader className="space-y-2">
              <DialogTitle className="font-display text-2xl">
                Payment Submitted Successfully
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                Thank you for your purchase.
                <br />
                Your payment screenshot has been received.
                <br />
                <br />
                Our team will verify your payment and send your indicator access shortly.
              </DialogDescription>
            </DialogHeader>
            <MagneticButton onClick={() => onOpenChange(false)} className="w-full">
              Done
            </MagneticButton>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Purchase {project.title}</DialogTitle>
              <DialogDescription>
                ${priceUsd} USD · {project.accessLabel || 'Lifetime Access'} · One-time payment
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" autoComplete="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mail ID</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@email.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+91 98765 43210"
                          autoComplete="tel"
                          inputMode="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-4">
                  <div className="lab-label !text-[#D4AF37]/80">Payment amount</div>
                  <div className="mt-1 font-display text-2xl font-bold text-[#D4AF37]">
                    ₹{formatInr(amountInr)}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Converted from ${priceUsd} USD · Pay this amount via UPI, then upload the
                    screenshot below.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card/40 px-4 py-4">
                  <div className="lab-label">Pay via UPI</div>
                  <div className="mt-3 flex flex-col items-center gap-3">
                    <div className="rounded-xl bg-white p-2 shadow-sm">
                      <img
                        src="/images/upi-qr.png"
                        alt="UPI payment QR code"
                        className="size-44 object-contain"
                      />
                    </div>
                    <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2.5">
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          UPI ID
                        </div>
                        <div className="truncate font-mono text-sm text-foreground">{UPI_ID}</div>
                      </div>
                      <button
                        type="button"
                        onClick={copyUpi}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                      >
                        {copied ? (
                          <>
                            <Check className="size-3.5 text-primary" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-center text-xs text-muted-foreground">
                      Scan the QR or pay to {UPI_ID}, then upload your payment screenshot.
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="screenshot"
                  render={() => (
                    <FormItem>
                      <FormLabel>Payment screenshot</FormLabel>
                      <FormControl>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => inputRef.current?.click()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
                          }}
                          onDragEnter={(e) => {
                            e.preventDefault();
                            setDragActive(true);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragActive(true);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            setDragActive(false);
                          }}
                          onDrop={onDrop}
                          className={cn(
                            'cursor-pointer rounded-xl border border-dashed px-4 py-6 text-center transition',
                            dragActive
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-card/30 hover:border-primary/40'
                          )}
                        >
                          <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onFileInput}
                          />
                          {previewUrl ? (
                            <div className="space-y-3">
                              <img
                                src={previewUrl}
                                alt="Payment screenshot preview"
                                className="mx-auto max-h-36 rounded-lg border border-border object-contain"
                              />
                              <p className="truncate text-sm text-foreground">
                                {screenshot instanceof File ? screenshot.name : 'Selected image'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Click or drop to replace
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                {dragActive ? (
                                  <Upload className="size-5" />
                                ) : (
                                  <ImagePlus className="size-5" />
                                )}
                              </div>
                              <p className="text-sm text-foreground">
                                Drag & drop or click to upload
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Image files only (PNG, JPG, WEBP)
                              </p>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root && (
                  <div className="text-sm text-destructive">{form.formState.errors.root.message}</div>
                )}

                <button
                  type="submit"
                  disabled={!isComplete || isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Submitting…
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

# Form Stories Implementation Guide

This guide documents the comprehensive form use cases implemented in `Form.stories.tsx` using the Field components, zod, react-hook-form, and @hookform/resolvers.

## Overview

All form stories demonstrate real-world scenarios with:

- ✅ Zod schema validation
- ✅ React Hook Form integration
- ✅ Error handling and display
- ✅ Loading states
- ✅ Accessible form controls
- ✅ Type-safe implementations

## Implemented Stories

### 1. **BasicForm** - Standard Form with Validation

**Use Case:** User registration form with various field types

**Features:**

- Text inputs (username, email, password, bio)
- Email validation
- Password strength validation (min length, uppercase, number)
- Checkbox for newsletter subscription
- Error messages display
- Form submission with loading state

**Schema:**

```typescript
z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  bio: z.string().optional(),
  subscribe: z.boolean(),
})
```

**Key Concepts:**

- Basic form setup with `useForm` hook
- Field-level validation
- aria-invalid attributes for accessibility
- FieldDescription for helper text
- FieldError for validation messages

---

### 2. **DynamicForm** - Array Fields Management

**Use Case:** Managing a list of email addresses with add/remove functionality

**Features:**

- Dynamic field array using `useFieldArray`
- Add new email fields
- Remove email fields (minimum 1 required)
- Individual field validation
- Array-level validation (at least one email required)

**Schema:**

```typescript
z.object({
  name: z.string().min(1),
  emails: z
    .array(
      z.object({
        value: z.string().email(),
      })
    )
    .min(1),
})
```

**Key Concepts:**

- `useFieldArray` for dynamic fields
- Array field registration: `register('emails.${index}.value')`
- Error handling for array items
- Adding/removing fields dynamically

---

### 3. **ConditionalForm** - Conditional Field Rendering

**Use Case:** Account registration with different fields based on account type (Personal vs Business)

**Features:**

- Conditional field display based on select value
- Watch form values to control visibility
- Different validation rules per account type
- Select component integration with Controller

**Schema:**

```typescript
z.object({
  accountType: z.enum(['personal', 'business']),
  email: z.string().email(),
  // Personal fields
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  // Business fields
  companyName: z.string().optional(),
  taxId: z.string().optional(),
  numberOfEmployees: z.string().optional(),
})
```

**Key Concepts:**

- `watch()` to monitor field values
- Conditional rendering based on form state
- Controller component for Radix UI Select
- FieldSeparator for visual grouping

---

### 4. **NestedArrayForm** - Nested Array Fields

**Use Case:** Project management with teams and members (nested arrays)

**Features:**

- Multiple teams (array)
- Each team has multiple members (nested array)
- Add/remove teams
- Add/remove members within teams
- Nested validation
- Complex form structure with FieldSet and FieldLegend

**Schema:**

```typescript
z.object({
  projectName: z.string().min(1),
  teams: z
    .array(
      z.object({
        teamName: z.string().min(1),
        members: z
          .array(
            z.object({
              name: z.string().min(1),
              role: z.string().min(1),
            })
          )
          .min(1),
      })
    )
    .min(1),
})
```

**Key Concepts:**

- Nested `useFieldArray` hooks
- Helper components for cleaner code
- Complex field path registration: `teams.${teamIndex}.members.${memberIndex}.name`
- FieldSet for grouping team sections
- Border and styling for visual hierarchy

---

### 5. **MultiStepForm** - Wizard/Stepper Form

**Use Case:** Multi-step registration process (3 steps: Account → Personal Info → Address)

**Features:**

- Step-by-step form navigation
- Progress indicator
- Validation per step before proceeding
- Back/Next navigation
- Final submission on last step
- Schema validation for each step

**Schemas:**

```typescript
step1Schema = z.object({ email, password })
step2Schema = z.object({ firstName, lastName, phone })
step3Schema = z.object({ address, city, country, zipCode })
multiStepSchema = step1Schema.merge(step2Schema).merge(step3Schema)
```

**Key Concepts:**

- `trigger()` for partial validation
- State management for current step
- Conditional rendering per step
- Visual progress indicator
- Step-specific field validation
- `mode: 'onTouched'` for better UX

---

### 6. **FieldOrientations** - Layout Variants

**Use Case:** Demonstrating different field layout options

**Features:**

- Vertical orientation (default)
- Horizontal orientation
- Responsive orientation
- Checkbox layouts with descriptions
- FieldSet grouping with legends

**Key Concepts:**

- `orientation` prop: 'vertical' | 'horizontal' | 'responsive'
- FieldContent for complex label structures
- FieldTitle for checkbox labels with descriptions
- FieldLegend variants: 'legend' | 'label'
- FieldSeparator for visual division

---

## Component Usage Patterns

### Field Component Structure

```tsx
<Field orientation="vertical">
  <FieldLabel htmlFor="fieldId">Label</FieldLabel>
  <Input
    id="fieldId"
    {...register('fieldName')}
    aria-invalid={!!errors.fieldName}
  />
  <FieldDescription>Helper text</FieldDescription>
  <FieldError errors={[errors.fieldName]} />
</Field>
```

### Checkbox with Description

```tsx
<Field orientation="horizontal">
  <Checkbox id="agree" {...register('agree')} />
  <FieldLabel htmlFor="agree">
    <FieldContent>
      <FieldTitle>Main Title</FieldTitle>
      <FieldDescription>Additional description</FieldDescription>
    </FieldContent>
  </FieldLabel>
</Field>
```

### Select with Controller

```tsx
<Controller
  name="fieldName"
  control={control}
  render={({ field }) => (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
      </SelectContent>
    </Select>
  )}
/>
```

### Dynamic Array Fields

```tsx
const { fields, append, remove } = useFieldArray({
  control,
  name: 'arrayField',
})

{
  fields.map((field, index) => (
    <Field key={field.id}>
      <Input {...register(`arrayField.${index}.value`)} />
      <Button onClick={() => remove(index)}>Remove</Button>
    </Field>
  ))
}

;<Button onClick={() => append({ value: '' })}>Add</Button>
```

## Best Practices

1. **Always use aria-invalid**: Helps screen readers identify invalid fields

   ```tsx
   aria-invalid={!!errors.fieldName}
   ```

2. **Unique keys for dynamic fields**: Use field.id from useFieldArray

   ```tsx
   key={field.id}
   ```

3. **Type-safe with TypeScript**: Define schema types

   ```tsx
   type FormData = z.infer<typeof schema>
   useForm<FormData>({ resolver: zodResolver(schema) })
   ```

4. **Error handling**: Pass errors as array to FieldError

   ```tsx
   <FieldError errors={[errors.fieldName]} />
   ```

5. **Loading states**: Use formState.isSubmitting

   ```tsx
   disabled = { isSubmitting }
   ```

6. **Async validation**: Use async onSubmit with proper error handling
   ```tsx
   const onSubmit = async (data: FormData) => {
     await new Promise(resolve => setTimeout(resolve, 1000))
     console.log(data)
   }
   ```

## Running Storybook

```bash
npm run storybook
# or
pnpm storybook
```

Navigate to: **UI/Form** to see all stories

## Testing the Forms

Each story includes:

- Console logging of submitted data
- Alert dialog showing JSON output
- Simulated async submission (1 second delay)

You can:

- Test validation by leaving fields empty or entering invalid data
- Test dynamic fields by adding/removing items
- Test conditional logic by changing select values
- Test multi-step flow by navigating through steps

## Dependencies

The implementation uses:

- `react-hook-form` v7.65.0
- `zod` v4.1.12
- `@hookform/resolvers` v5.2.2
- `lucide-react` (icons)
- Custom UI components from the workspace

## Further Customization

You can extend these examples by:

- Adding more validation rules
- Implementing real API calls
- Adding file upload fields
- Creating custom validation messages
- Implementing debounced async validation
- Adding field dependencies and cross-field validation

# Starting Development

## Guidelines

### New Features (New components, pages, etc)

- Create a new branch
- Work on that branch
- Test if it works first
- Merge request

### Database Schema Modifications (e,g. new tables)

1. Run this bash command to generate the migration file. Use a descriptive name like "create_orgs_and_students_tables".

    ```bash
    npx supabase db diff -f a_descriptive_name_for_your_change
    ```

2. Verifying the entire migration chain. A success means that you can probably push it. I think?

    ```bash
    npx supabase db reset
    ```

3. Commit to your branch. Of course replace the message with the suitable message.

    ```bash
    git add .
    git commit -m "feat: add posts table and rename org description"
    git push
    ```

4. Push to production (ONLY KEM SHOULD DO THIS. THIS WILL PUSH THE MIGRATION TO THE LIVE DATABASE)

    ```bash
    npx supabase db push
    ```

# Backend Development Guide

## Database Management

### Exporting the Database

To export the current database state, use the following command:

```bash
npm run export
```

This will create a `seed-data.tar.gz` file in the backend directory containing:
- All content types and their data
- Media files
- Configuration settings
- Plugin configurations

### Seeding the Database

To import data from a seed file, use the following command:

```bash
npm run seed
```

This will import the data from `seed-data.tar.gz` into your database. The import process:
1. Clears existing data
2. Imports all content types and their data
3. Restores media files
4. Applies configuration settings

### Best Practices for Database Management

1. **Regular Backups**
   - Export the database before making major changes
   - Keep multiple backup versions
   - Store backups in a secure location

2. **Seeding Development**
   - Use seed data for development environments
   - Keep seed data up to date with production schema
   - Include representative test data

3. **Data Migration**
   - Test imports in a staging environment first
   - Document any manual steps required
   - Verify data integrity after import

4. **Security**
   - Never include sensitive data in seed files
   - Use encryption for production backups
   - Follow data protection regulations


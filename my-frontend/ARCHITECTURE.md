# Clean Architecture Implementation

This project follows Clean Architecture principles with SOLID design patterns.

## Architecture Layers

### 1. Domain Layer (`/src/domain/`)
**Purpose**: Core business logic, entities, and rules. No dependencies on external frameworks.

- **Models** (`/models/`): Core business entities (Lead, Email, LeadId)
- **Repositories** (`/repositories/`): Abstract interfaces for data access
- **Services** (`/services/`): Business logic and domain rules

**Key Principles**:
- ✅ No external dependencies (framework-agnostic)
- ✅ Contains business rules and validation
- ✅ Uses Value Objects for type safety

### 2. Application Layer (`/src/application/`)
**Purpose**: Orchestrates domain services, implements use cases.

- **Use Cases** (`/usecases/`): Application-specific business logic
- **DTOs**: Data transfer objects for application boundaries

**Key Principles**:
- ✅ Coordinates between domain and infrastructure
- ✅ Framework-independent business workflows

### 3. Infrastructure Layer (`/src/infrastructure/`)
**Purpose**: External dependencies, database, APIs, frameworks.

- **Repositories** (`/repositories/`): Concrete implementations of domain interfaces
- **DI Container** (`/di/`): Dependency injection setup
- **External Services**: Firebase, APIs, etc.

**Key Principles**:
- ✅ Implements domain interfaces
- ✅ Contains framework-specific code
- ✅ Handles external dependencies

### 4. Presentation Layer (`/src/presentation/`)
**Purpose**: UI components, hooks, presentation logic.

- **Components** (`/components/`): Pure UI components
- **Hooks** (`/hooks/`): React-specific logic and state management

**Key Principles**:
- ✅ Separated concerns (UI vs business logic)
- ✅ Reusable components
- ✅ Framework-specific code

## SOLID Principles Applied

### Single Responsibility Principle (SRP)
- ✅ **LeadFormFields**: Only handles form field rendering
- ✅ **ErrorMessage**: Only handles error display
- ✅ **useLeadForm**: Only handles form state and submission logic
- ✅ **LeadDomainService**: Only handles lead business logic

### Open/Closed Principle (OCP)
- ✅ **ILeadRepository**: Interface allows new implementations without changing existing code
- ✅ **Domain services**: Extensible through new use cases

### Liskov Substitution Principle (LSP)
- ✅ **FirebaseLeadRepository**: Can be replaced with any ILeadRepository implementation
- ✅ **Value Objects**: Email, LeadId are substitutable

### Interface Segregation Principle (ISP)
- ✅ **Small, focused interfaces**: ILeadRepository only has methods clients need
- ✅ **Component props**: Specific interfaces for each component

### Dependency Inversion Principle (DIP)
- ✅ **Domain depends on abstractions**: LeadDomainService depends on ILeadRepository interface
- ✅ **Infrastructure implements abstractions**: FirebaseLeadRepository implements ILeadRepository
- ✅ **DI Container**: Manages dependencies and injection

## Benefits

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Changes in one layer don't affect others
3. **Flexibility**: Easy to swap implementations (Firebase → PostgreSQL)
4. **Reusability**: Domain logic can be reused across different UIs
5. **Scalability**: Clear boundaries make it easy to add features

## Dependencies Flow

```
Presentation Layer
       ↓
Application Layer  
       ↓
Domain Layer (Core)
       ↑
Infrastructure Layer
```

**Rule**: Dependencies only flow inward. Core domain has no external dependencies.

## Example Usage

```typescript
// Domain (business rules)
const email = new Email("user@example.com"); // Validates format
const leadId = new LeadId(email.toString(), "share"); // Creates unique ID

// Application (use case)
const createLead = new CreateLeadUseCase(leadDomainService);
await createLead.execute(formData, "share");

// Infrastructure (implementation detail)
const repository = new FirebaseLeadRepository(); // Could be PostgreSQLLeadRepository

// Presentation (UI)
const { formData, handleSubmit } = useLeadForm("share"); // Clean separation
```

## Migration Notes

**Old vs New**:
- ❌ **Old**: Business logic mixed in components
- ✅ **New**: Business logic in domain services
- ❌ **Old**: Direct Firebase calls in components  
- ✅ **New**: Repository pattern with interfaces
- ❌ **Old**: Validation scattered across codebase
- ✅ **New**: Centralized validation in domain models
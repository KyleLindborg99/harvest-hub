// Dependency Injection Container
import { ILeadRepository } from '../../domain/repositories/ILeadRepository';
import { FirebaseLeadRepository } from '../repositories/FirebaseLeadRepository';
import { LeadDomainService } from '../../domain/services/LeadDomainService';
import { CreateLeadUseCase } from '../../application/usecases/CreateLeadUseCase';

// Simple DI Container
class DIContainer {
    private readonly dependencies = new Map<string, any>();

    register<T>(key: string, instance: T): void {
        this.dependencies.set(key, instance);
    }

    resolve<T>(key: string): T {
        const dependency = this.dependencies.get(key);
        if (!dependency) {
            throw new Error(`Dependency ${key} not found`);
        }
        return dependency;
    }
}

// Container setup
const container = new DIContainer();

// Register dependencies (following dependency inversion)
const leadRepository: ILeadRepository = new FirebaseLeadRepository();
const leadDomainService = new LeadDomainService(leadRepository);
const createLeadUseCase = new CreateLeadUseCase(leadDomainService);

container.register('ILeadRepository', leadRepository);
container.register('LeadDomainService', leadDomainService);
container.register('CreateLeadUseCase', createLeadUseCase);

export { container };
import { Profile } from './Profile';
import { Agent } from './Agent';
import { ContractAgent } from './ContractAgent';
import { SearchCriteria, FilterOperator, ProfileConfigurations } from './types';

export class RequestHandler {
  private contractAgent?: ContractAgent;
  private profilesHost: string = '';

  constructor() {}

  async prepare() {
    this.contractAgent = await ContractAgent.retrieveService();
    this.profilesHost = Agent.getProfileHost();
    if (!this.profilesHost) {
      throw new Error('Profiles Host not set');
    }
  }

  // Return only the policies from recommendations
  async getPoliciesRecommendationFromProfile(profileId: string): Promise<any> {
    const criteria: SearchCriteria = {
      conditions: [
        {
          field: 'url',
          operator: FilterOperator.EQUALS,
          value: profileId,
        },
      ],
      threshold: 0,
    };

    if (!this.contractAgent) {
      throw new Error('Contract Agent undefined');
    }
    const profiles = await this.contractAgent.findProfiles(
      this.profilesHost,
      criteria,
    );
    if (profiles.length === 0) {
      throw new Error('Profile not found');
    }
    return profiles[0].recommendations.map((rec) => rec.policies);
  }

  // Return only the services from recommendations
  async getServicesRecommendationFromProfile(profileId: string): Promise<any> {
    const criteria: SearchCriteria = {
      conditions: [
        {
          field: 'url',
          operator: FilterOperator.EQUALS,
          value: profileId,
        },
      ],
      threshold: 0,
    };
    if (!this.contractAgent) {
      throw new Error('Contract Agent undefined');
    }
    const profiles = await this.contractAgent.findProfiles(
      this.profilesHost,
      criteria,
    );
    if (profiles.length === 0) {
      throw new Error('Profile not found');
    }
    return profiles[0].recommendations.map((rec) => rec.services);
  }

  // Return only the policies from matching
  async getPoliciesMatchingFromProfile(profileId: string): Promise<any> {
    const criteria: SearchCriteria = {
      conditions: [
        {
          field: 'url',
          operator: FilterOperator.EQUALS,
          value: profileId,
        },
      ],
      threshold: 0,
    };

    if (!this.contractAgent) {
      throw new Error('Contract Agent undefined');
    }
    const profiles = await this.contractAgent.findProfiles(
      this.profilesHost,
      criteria,
    );
    if (profiles.length === 0) {
      throw new Error('Profile not found');
    }
    return profiles[0].matching.map((match) => match.policies);
  }

  // Return only the services from matching
  async getServicesMatchingFromProfile(profileId: string): Promise<any> {
    const criteria: SearchCriteria = {
      conditions: [
        {
          field: 'url',
          operator: FilterOperator.EQUALS,
          value: profileId,
        },
      ],
      threshold: 0,
    };
    if (!this.contractAgent) {
      throw new Error('Contract Agent undefined');
    }
    const profiles = await this.contractAgent.findProfiles(
      this.profilesHost,
      criteria,
    );
    if (profiles.length === 0) {
      throw new Error('Profile not found');
    }
    return profiles[0].matching.map((match) => match.services);
  }

  // Return only the ecosystemContracts from matching
  async getContractMatchingFromProfile(profileId: string): Promise<any> {
    const criteria: SearchCriteria = {
      conditions: [
        {
          field: 'url',
          operator: FilterOperator.EQUALS,
          value: profileId,
        },
      ],
      threshold: 0,
    };

    if (!this.contractAgent) {
      throw new Error('Contract Agent undefined');
    }
    const profiles = await this.contractAgent.findProfiles(
      this.profilesHost,
      criteria,
    );
    if (profiles.length === 0) {
      throw new Error('Profile not found');
    }
    return profiles[0].matching.map((match) => match.ecosystemContracts);
  }

  // configurations

  async getConfigurationsFromProfile(profileId: string): Promise<any> {
    const criteria: SearchCriteria = {
      conditions: [
        {
          field: 'url',
          operator: FilterOperator.EQUALS,
          value: profileId,
        },
      ],
      threshold: 0,
    };
    if (!this.contractAgent) {
      throw new Error('Contract Agent undefined');
    }
    const profiles = await this.contractAgent.findProfiles(
      this.profilesHost,
      criteria,
    );
    if (profiles.length === 0) {
      throw new Error('Profile not found');
    }
    return profiles[0].configurations;
  }

  async addConfigurationsToProfile(
    profileId: string,
    configurations: any,
  ): Promise<any> {
    const criteria: SearchCriteria = {
      conditions: [
        {
          field: 'url',
          operator: FilterOperator.EQUALS,
          value: profileId,
        },
      ],
      threshold: 0,
    };
    if (!this.contractAgent) {
      throw new Error('Contract Agent undefined');
    }
    const profiles = await this.contractAgent.findProfiles(
      this.profilesHost,
      criteria,
    );
    if (profiles.length === 0) {
      throw new Error('Profile not found');
    }
    const profile = profiles[0];
    profile.configurations = { ...profile.configurations, ...configurations };
    await this.contractAgent.saveProfile(this.profilesHost, criteria, profile);
    return { message: 'Configurations added successfully', profile };
  }

  async updateConfigurationsForProfile(
    profileId: string,
    configurations: any,
  ): Promise<any> {
    const criteria: SearchCriteria = {
      conditions: [
        {
          field: 'url',
          operator: FilterOperator.EQUALS,
          value: profileId,
        },
      ],
      threshold: 0,
    };
    if (!this.contractAgent) {
      throw new Error('Contract Agent undefined');
    }
    const profiles = await this.contractAgent.findProfiles(
      this.profilesHost,
      criteria,
    );
    if (profiles.length === 0) {
      throw new Error('Profile not found');
    }
    const profile = profiles[0];
    profile.configurations = configurations;
    await this.contractAgent.saveProfile(this.profilesHost, criteria, profile);
    return { message: 'Configurations updated successfully', profile };
  }

  async removeConfigurationsFromProfile(profileId: string): Promise<any> {
    const criteria: SearchCriteria = {
      conditions: [
        {
          field: 'url',
          operator: FilterOperator.EQUALS,
          value: profileId,
        },
      ],
      threshold: 0,
    };
    if (!this.contractAgent) {
      throw new Error('Contract Agent undefined');
    }
    const profiles = await this.contractAgent.findProfiles(
      this.profilesHost,
      criteria,
    );
    if (profiles.length === 0) {
      throw new Error('Profile not found');
    }
    const profile: Profile = profiles[0];
    profile.configurations = {
      allowRecommendation: false,
      allowPolicies: false,
    };
    await this.contractAgent.saveProfile(this.profilesHost, criteria, profile);
    return { message: 'Configurations removed successfully', profile };
  }
}

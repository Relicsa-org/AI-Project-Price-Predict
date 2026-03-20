export interface Config {
    agency_name: string;
    currency: string;
    exchange_rates: {
        USD: number;
        EUR: number;
    };
    rates: {
        [key: string]: number;
    };
    margin_percentage: number;
    maintenance_percentage_monthly: number;
    risk_buffer_default: number;
    global_multiplier: {
        [key: string]: number;
    };
}

export interface RoleRequirement {
    role: string;
    percentage: number;
}

export interface Skill {
    skill_id: string;
    name: string;
    domain: string;
    complexity: string;
    base_hours: number;
    roles_required: RoleRequirement[];
    dependencies?: string[];
    risk_buffer: number;
    tags: string[];
    id: string;
    description: string;
    category: string;
}

export interface MatchedSkill extends Skill {
    estimated_hours: number;
}

export interface EstimateBreakdown {
    skill: string;
    hours: number;
    cost: number;
}

export interface Estimate {
    totalHours: number;
    totalCostINR: number;
    totalCostUSD: number;
    monthlyMaintenanceCostINR: number;
    monthlyMaintenanceCostUSD: number;
    breakdown: EstimateBreakdown[];
    timelineWeeks: number;
}

export interface EstimateResult {
    requirement: string;
    location: string;
    summary: string;
    matchedSkills: MatchedSkill[];
    estimate: Estimate;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
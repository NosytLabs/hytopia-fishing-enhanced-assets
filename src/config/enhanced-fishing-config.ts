/**
 * Enhanced Fishing Game Configuration System
 * Centralized configuration for all enhanced systems and features
 */

export interface GameSettings {
  difficulty: 'easy' | 'normal' | 'hard' | 'expert';
  enableTutorial: boolean;
  autoSave: boolean;
  saveInterval: number; // in seconds
  maxSaveSlots: number;
}

export interface PhysicsConfig {
  water: {
    density: number;
    viscosity: number;
    currentStrength: number;
    waveAmplitude: number;
    buoyancyFactor: number;
    turbulence: number;
  };
  line: {
    tension: number;
    elasticity: number;
    breakingPoint: number;
    windResistance: number;
  };
  fish: {
    swimSpeed: number;
    escapeForce: number;
    staminaDrain: number;
    reactionTime: number;
  };
}

export interface AudioConfig {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  ambientVolume: number;
  spatialAudio: boolean;
  reverbEnabled: boolean;
  underwaterFilter: boolean;
}

export interface VisualConfig {
  particles: {
    enabled: boolean;
    density: number;
    bubbles: boolean;
    ripples: boolean;
    caustics: boolean;
    bioluminescence: boolean;
  };
  lighting: {
    dynamicLighting: boolean;
    sunlightIntensity: number;
    underwaterTint: string;
    causticsEnabled: boolean;
    shadowQuality: 'low' | 'medium' | 'high' | 'ultra';
  };
  textures: {
    quality: 'low' | 'medium' | 'high' | 'ultra';
    svgTextures: boolean;
    animatedTextures: boolean;
    textureFiltering: boolean;
  };
}

export interface MapConfig {
  currentMap: string;
  availableMaps: string[];
  weatherEnabled: boolean;
  timeOfDay: 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night';
  seasonalEffects: boolean;
}

export interface FishingMechanics {
  castingPower: {
    min: number;
    max: number;
    accuracy: number;
  };
  reeling: {
    speed: number;
    resistance: number;
    autoReel: boolean;
  };
  bait: {
    effectiveness: number;
    durability: number;
    attractionRadius: number;
  };
  achievements: {
    enabled: boolean;
    notifications: boolean;
    tracking: boolean;
  };
}

export interface PerformanceConfig {
  targetFPS: number;
  vsync: boolean;
  renderDistance: number;
  lodEnabled: boolean;
  particleLimit: number;
  memoryOptimization: boolean;
}

export interface EnhancedFishingConfig {
  game: GameSettings;
  physics: PhysicsConfig;
  audio: AudioConfig;
  visual: VisualConfig;
  maps: MapConfig;
  fishing: FishingMechanics;
  performance: PerformanceConfig;
}

// Default configuration
export const DEFAULT_ENHANCED_CONFIG: EnhancedFishingConfig = {
  game: {
    difficulty: 'normal',
    enableTutorial: true,
    autoSave: true,
    saveInterval: 300, // 5 minutes
    maxSaveSlots: 5
  },
  physics: {
    water: {
      density: 1.2,
      viscosity: 0.8,
      currentStrength: 0.3,
      waveAmplitude: 0.8,
      buoyancyFactor: 1.1,
      turbulence: 0.2
    },
    line: {
      tension: 1.0,
      elasticity: 0.7,
      breakingPoint: 100,
      windResistance: 0.1
    },
    fish: {
      swimSpeed: 1.0,
      escapeForce: 0.8,
      staminaDrain: 0.5,
      reactionTime: 0.3
    }
  },
  audio: {
    masterVolume: 0.8,
    musicVolume: 0.6,
    sfxVolume: 0.8,
    ambientVolume: 0.5,
    spatialAudio: true,
    reverbEnabled: true,
    underwaterFilter: true
  },
  visual: {
    particles: {
      enabled: true,
      density: 1.0,
      bubbles: true,
      ripples: true,
      caustics: true,
      bioluminescence: true
    },
    lighting: {
      dynamicLighting: true,
      sunlightIntensity: 0.8,
      underwaterTint: '#4A90E2',
      causticsEnabled: true,
      shadowQuality: 'high'
    },
    textures: {
      quality: 'high',
      svgTextures: true,
      animatedTextures: true,
      textureFiltering: true
    }
  },
  maps: {
    currentMap: 'coral-bay-enhanced',
    availableMaps: ['coral-bay-enhanced', 'deep-ocean-trench', 'tropical-lagoon'],
    weatherEnabled: true,
    timeOfDay: 'morning',
    seasonalEffects: true
  },
  fishing: {
    castingPower: {
      min: 0.1,
      max: 1.0,
      accuracy: 0.8
    },
    reeling: {
      speed: 1.0,
      resistance: 0.7,
      autoReel: false
    },
    bait: {
      effectiveness: 1.0,
      durability: 100,
      attractionRadius: 5.0
    },
    achievements: {
      enabled: true,
      notifications: true,
      tracking: true
    }
  },
  performance: {
    targetFPS: 60,
    vsync: true,
    renderDistance: 100,
    lodEnabled: true,
    particleLimit: 1000,
    memoryOptimization: true
  }
};

/**
 * Enhanced Configuration Manager
 * Handles loading, saving, and validation of configuration settings
 */
export class EnhancedConfigManager {
  private config: EnhancedFishingConfig;
  private world: any;
  
  constructor(world: any, customConfig?: Partial<EnhancedFishingConfig>) {
    this.world = world;
    this.config = this.mergeConfigs(DEFAULT_ENHANCED_CONFIG, customConfig || {});
    this.validateConfig();
  }
  
  /**
   * Get the current configuration
   */
  getConfig(): EnhancedFishingConfig {
    return { ...this.config };
  }
  
  /**
   * Update configuration with new values
   */
  updateConfig(updates: Partial<EnhancedFishingConfig>): void {
    this.config = this.mergeConfigs(this.config, updates);
    this.validateConfig();
    this.saveConfig();
  }
  
  /**
   * Get a specific configuration section
   */
  getSection<K extends keyof EnhancedFishingConfig>(section: K): EnhancedFishingConfig[K] {
    return { ...this.config[section] };
  }
  
  /**
   * Update a specific configuration section
   */
  updateSection<K extends keyof EnhancedFishingConfig>(
    section: K, 
    updates: Partial<EnhancedFishingConfig[K]>
  ): void {
    this.config[section] = { ...this.config[section], ...updates };
    this.validateConfig();
    this.saveConfig();
  }
  
  /**
   * Reset configuration to defaults
   */
  resetToDefaults(): void {
    this.config = { ...DEFAULT_ENHANCED_CONFIG };
    this.saveConfig();
  }
  
  /**
   * Load configuration from world storage
   */
  private loadConfig(): EnhancedFishingConfig {
    try {
      const savedConfig = this.world.getMetadata('enhancedFishingConfig');
      if (savedConfig) {
        return this.mergeConfigs(DEFAULT_ENHANCED_CONFIG, JSON.parse(savedConfig));
      }
    } catch (error) {
      console.warn('Failed to load saved configuration, using defaults:', error);
    }
    return { ...DEFAULT_ENHANCED_CONFIG };
  }
  
  /**
   * Save configuration to world storage
   */
  private saveConfig(): void {
    try {
      this.world.setMetadata('enhancedFishingConfig', JSON.stringify(this.config));
    } catch (error) {
      console.error('Failed to save configuration:', error);
    }
  }
  
  /**
   * Merge two configuration objects deeply
   */
  private mergeConfigs(
    base: EnhancedFishingConfig, 
    override: Partial<EnhancedFishingConfig>
  ): EnhancedFishingConfig {
    const result = { ...base };
    
    for (const key in override) {
      if (override.hasOwnProperty(key)) {
        const value = override[key as keyof EnhancedFishingConfig];
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          result[key as keyof EnhancedFishingConfig] = {
            ...result[key as keyof EnhancedFishingConfig],
            ...value
          } as any;
        } else {
          result[key as keyof EnhancedFishingConfig] = value as any;
        }
      }
    }
    
    return result;
  }
  
  /**
   * Validate configuration values
   */
  private validateConfig(): void {
    // Validate numeric ranges
    this.config.audio.masterVolume = Math.max(0, Math.min(1, this.config.audio.masterVolume));
    this.config.audio.musicVolume = Math.max(0, Math.min(1, this.config.audio.musicVolume));
    this.config.audio.sfxVolume = Math.max(0, Math.min(1, this.config.audio.sfxVolume));
    this.config.audio.ambientVolume = Math.max(0, Math.min(1, this.config.audio.ambientVolume));
    
    this.config.physics.water.density = Math.max(0.1, this.config.physics.water.density);
    this.config.physics.water.viscosity = Math.max(0, Math.min(2, this.config.physics.water.viscosity));
    
    this.config.performance.targetFPS = Math.max(30, Math.min(144, this.config.performance.targetFPS));
    this.config.performance.particleLimit = Math.max(100, this.config.performance.particleLimit);
    
    // Validate enum values
    const validDifficulties = ['easy', 'normal', 'hard', 'expert'];
    if (!validDifficulties.includes(this.config.game.difficulty)) {
      this.config.game.difficulty = 'normal';
    }
    
    const validQualities = ['low', 'medium', 'high', 'ultra'];
    if (!validQualities.includes(this.config.visual.lighting.shadowQuality)) {
      this.config.visual.lighting.shadowQuality = 'high';
    }
    if (!validQualities.includes(this.config.visual.textures.quality)) {
      this.config.visual.textures.quality = 'high';
    }
  }
}
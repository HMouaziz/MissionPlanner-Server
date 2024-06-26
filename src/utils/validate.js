const Joi = require('joi');

const missionSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().allow('', null),
  budget: Joi.number().allow(null),
  status: Joi.string().valid('planned', 'in_progress', 'completed', 'on_hold', 'failed', 'cancelled').default('planned'),
  priority: Joi.string().valid('high', 'normal', 'low').default('normal'),
  typeId: Joi.number().integer().allow(null),
});

const stageSchema = Joi.object({
  missionId: Joi.number().integer().required(),
  orderIndex: Joi.number().integer().required(),
  type: Joi.string().valid(
    'Maneuver', 'Deployment', 'Launch', 'CorrectionBurn',
    'Burn', 'Aerobrake', 'Spacewalk', 'Other'
  ).required(),
  status: Joi.string().valid('Planned', 'In Progress', 'Completed', 'Failed').default('Planned'),
  description: Joi.string().allow(null),
  data: Joi.string().allow(null),
});

const typeSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().max(255).required(),
  description: Joi.string().allow(null),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso(),
});

const objectiveSchema = Joi.object({
  missionId: Joi.number().integer().required(),
  description: Joi.string().allow(null),
  type: Joi.string().valid(
    'Altitude', 'Flyby', 'OrbitDuration', 'PowerGeneration',
    'Speed', 'CrewRequirement', 'Other'
  ).required(),
  data: Joi.string().allow(null),
  status: Joi.string().valid('Planned', 'In Progress', 'Completed', 'Failed').default('Planned'),
});

const validateMission = (missionData) => {
  const { error } = missionSchema.validate(missionData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const validateStage = (stageData) => {
  const { error } = stageSchema.validate(stageData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const validateObjective = (objectiveData) => {
  const { error } = objectiveSchema.validate(objectiveData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const validateType = (typeData) => {
  const { error } = typeSchema.validate(typeData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = { validateMission, validateStage, validateObjective, validateType };
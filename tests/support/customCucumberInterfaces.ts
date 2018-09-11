import {ScenarioResult} from 'cucumber';

export interface ScenarioResultOnError extends ScenarioResult {
  exception: Error
}

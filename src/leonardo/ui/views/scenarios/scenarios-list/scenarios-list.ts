/// <reference path="../../../../leonardo.d.ts" />
import Utils from '../../../ui-utils';
import Events from '../../../ui-events';

export default class ScenariosList {

  viewNode: any;
  static SELECTED_CLASS = 'leonardo-selected-scenario';

  constructor() {
    this.viewNode = Utils.getElementFromHtml(`<div id="leonardo-scenarios-list" class="leonardo-scenarios-list"></div>`);
  }

  get() {
    return this.viewNode;
  }

  render() {
    this.viewNode.innerHTML = '';
    this.viewNode.appendChild(Utils.getElementFromHtml(`<div>Scenarios</div>`));
    const ul = Utils.getElementFromHtml(`<ul></ul>`);
    Leonardo.getScenarios()
      .map(this.getScenarioElement.bind(this))
      .forEach((scenarioElm) => {
        ul.appendChild(scenarioElm);
      });
    this.viewNode.appendChild(ul);

  }

  getScenarioElement(scenario) {
    const el = Utils.getElementFromHtml(`<li>${scenario}</li>`);
    el.addEventListener('click', () => {
      Events.dispatch(Events.SCENARIO_CLICKED, { name: scenario });
      this.viewNode.querySelectorAll('li').forEach(li => li.classList.remove(ScenariosList.SELECTED_CLASS));
      el.classList.add(ScenariosList.SELECTED_CLASS);
    });
    return el;
  }
}
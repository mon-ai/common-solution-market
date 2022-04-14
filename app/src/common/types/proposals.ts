export interface IProposals {
  proposals: IProposal[];
}

export interface IProposal {
  id: number;
  title: string;
  description: string;
  funding: number;
  funders: number;
  issues: IIssues;
  simulations: ISimulations;
}

export interface IIssues {
  mergers: IMerger[];
  changes: IChange[];
}

export interface IMerger {
  id: number;
  title: string;
  description: string;
}

export interface IChange {
  id: number;
  title: string;
  description: string;
}

export interface ISimulations {
  simulations: ISimulation[];
}

export interface ISimulation {
  id: number;
  title: string;
  description: string;
}

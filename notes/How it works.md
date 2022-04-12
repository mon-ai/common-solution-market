# How it works
### Proposal Creators (P)
1. Someone proposes a problem to be solved, in human language. e.g. "the game of chess". They create a [[Proposal DAO]] representing the problem proposal, and can optionally commit some funding to its treasury.
2. Others can fund the proposal treasury, receiving governance tokens in return. Governors of a proposal can vote to merge their proposal with another. Merged proposals become a single DAO.

	 Alternatively, a proposal can be closed. No one but the original proposer can fund the proposal, and the solution if achieved is only available to the original proposer.
3. Governors of a proposal also decide on the acceptable degree of solution performance, in human language. e.g. "at least 3000 Elo".
4. After S2., submitted simulation bids are exposed to the proposal governors through a frontend where they can interact directly with the simulation, but not see its source code. Proposal governors can haggle with the simulation writer, and when satisfied, vote to accept a bid.
5. After S3., the simulation is open sourced by default. proposal governors can continue to fund a simulation to improve its performance. All funds go toward the simulation computation cost by default.
### Simulation Creators (S)
1. Anyone (person or [[Simulation DAO]]) can submit a simulation fulfilling a proposal, conforming with the [[Solver API]]. The [[Solver]] will calculate an estimated curve of \[simulation cost\] / \[solution performance\].
2. The simulation writer suggests a point on the curve to satisfy the proposer's stated acceptable performance. If the cost of simulation is less than the available funding from the Proposal treasury, the simulation writer can submit a bid.

	The simulation writer can include additional terms in the submission, such as on the simulation code license, or on receiving a portion of the continued funding from P5.
3. If a bid is accepted in P4., the Solver solves the simulation to the simulation writer's suggested point. Its computation cost is funded by the Proposal treasury, and the remainder of the funding goes to the simulation writer.
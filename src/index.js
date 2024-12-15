import { scrapeFantasyData } from './scraper.js';
import { FantasyPredictor } from './predictor.js';
import { mkdir } from 'fs/promises';

async function main() {
  try {
    // Create data directory if it doesn't exist
    await mkdir('data', { recursive: true });

    // Scrape latest data
    console.log('Scraping fantasy football data...');
    await scrapeFantasyData();

    // Initialize predictor
    const predictor = new FantasyPredictor();
    await predictor.loadData();

    // Example predictions
    const qbPrediction = predictor.predictPassingYards('Patrick Mahomes');
    const rbPrediction = predictor.predictRushingYards('Derrick Henry');
    const gameWinner = predictor.predictWinner('Chiefs', 'Bills');

    console.log('\nPredictions for this Sunday:');
    console.log(`QB Passing Yards (Mahomes): ${qbPrediction} yards`);
    console.log(`RB Rushing Yards (Henry): ${rbPrediction} yards`);
    console.log(`Predicted Winner: ${gameWinner}`);

  } catch (error) {
    console.error('Error in main process:', error);
  }
}

main();
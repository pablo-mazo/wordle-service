import DataSource from '../orm/dbConnection';
import WordEntity from '../orm/entity/WordEntity';

export async function selectNewWord(){
    const wordsRepository = DataSource.getRepository(WordEntity);
    // Search new word
    const newWord = await wordsRepository.createQueryBuilder()
        .where('used = :used', { used: false })
        .orderBy('RANDOM()')
        .getOne();

    // Update previous word
    await DataSource.createQueryBuilder()
        .update(WordEntity)
        .set({ used: false })
        .where('used = :used', { used: true })
        .execute();

    // Become searched word to currently word
    await DataSource.createQueryBuilder()
        .update(WordEntity)
        .set({ used: true })
        .where('id = :id', { id: newWord?.id })
        .execute();
} 
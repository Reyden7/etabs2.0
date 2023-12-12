import * as FileSystem from 'expo-file-system';

const getImagesFromDirectory = async (instru, typechords) => {
  const imgDirectory = 'assets/img'; // Chemin du dossier des images
  console.log(instru,typechords);
  try {
    const modulePath = `${FileSystem.documentDirectory}${imgDirectory}/${instru}/${typechords}`;
    
    // Vérifier si le répertoire existe
    const directoryInfo = await FileSystem.getInfoAsync(modulePath);
    
    if (!directoryInfo.exists || !directoryInfo.isDirectory) {
      throw new Error(`Le répertoire ${modulePath} n'existe pas ou n'est pas un répertoire.`);
    }

    const imgAssets = await FileSystem.readDirectoryAsync(modulePath);

    const images = await Promise.all(
      imgAssets.map(async asset => {
        const imagePath = `${modulePath}/${asset}`;
        const imageModule = await FileSystem.getInfoAsync(imagePath);
        return imageModule.uri;
      })
    );

    return images;
  } catch (error) {
    console.error('Erreur lors de la lecture du répertoire :', error);
    throw error;
  }
};

export default getImagesFromDirectory;

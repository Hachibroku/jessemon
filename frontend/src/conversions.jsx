function convertDecimetersToFeetAndInches(heightInDecimeters) {
    const heightInMeters = heightInDecimeters * 0.1;
    const heightInFeet = heightInMeters * 3.28084;
    const feet = Math.floor(heightInFeet);
    const inches = Math.round((heightInFeet - feet) * 12);
    return `${feet} feet ${inches} inches`;
  }

  function convertHectogramsToPounds(weightInHectograms) {
    const pounds = Math.floor(weightInHectograms * 0.220462);
    return pounds + " pounds";
  }

  function formatPokemonTypes(typesString) {
    const typesArray = typesString.split(', ');
    const formattedTypes = typesArray.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(' / ');
    return formattedTypes;
  }

  function getPokemonRegion(id) {
    switch (true) {
      case id >= 1 && id <= 151:
        return "Kanto"; // Region 1: Generation 1
      case id >= 152 && id <= 251:
        return "Johto"; // Region 2: Generation 2
      case id >= 252 && id <= 386:
        return "Hoenn"; // Region 3: Generation 3
      case id >= 387 && id <= 493:
        return "Sinnoh"; // Region 4: Generation 4
      case id >= 494 && id <= 649:
        return "Unova"; // Region 5: Generation 5
      case id >= 650 && id <= 721:
        return "Kalos"; // Region 6: Generation 6
      case id >= 722 && id <= 809:
        return "Galar"; // Region 7: Generation 7
      case id >= 810 && id <= 905:
        return "Hisui"; // Region 8: Generation 8
      case id >= 906 && id <= 1017:
        return "Paldea"; // Region 9: Generation 9
      default:
        return "Digimon"; // If the ID doesn't match any region
    }
  }





  export {
    convertDecimetersToFeetAndInches,
    convertHectogramsToPounds,
    formatPokemonTypes,
    getPokemonRegion
  };

export const getAbilitiesFromLinks = (links = []) => {
    return links.reduce((abilities, link) => {
        abilities.push({
            name: link.ability,
            type: link.type
        });

        return abilities;
    }, []);
};

export const getAbilitiesFromUser = (userAbilities = [], entityField = 'entity_type') => {
    return userAbilities.reduce((abilities, ability) => {
        abilities.push({
            name: ability.name,
            type: ability[entityField]
        });

        return abilities;
    }, []);
};

export const canAccess = (userAbilities, neededAbilities, wildcard = '*') => {
    let status = true;

    neededAbilities.forEach((neededAbility) => {
        if (neededAbility.name === wildcard) {
            status = true && status;
        } else {
            const foundAbility = userAbilities.find((ability) => {
                return ability.name === neededAbility.name && ability.type === neededAbility.type;
            });
            status = foundAbility !== undefined && status;
        }
    });

    return status;
};
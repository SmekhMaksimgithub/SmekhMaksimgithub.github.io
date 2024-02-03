class Cocktail{

	static type = "cocktail"

	constructor(options)
	{
		this.id = options.id;
		this.available = options.available;
		this.name = options.name;
		this.strength = options.strength;
		this.kind = options.kind;
		this.flavor = options.flavor;
		this.base = options.base;
		this.img_path = options.img_path;
		this.components = options.components;
		this.description = options.description;
		this.recipe = options.recipe;
	}

}
module.exports = {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-sass-guidelines',
      'stylelint-prettier/recommended',
    ],
    "rules": {
        "selector-no-qualifying-type": [
            true,
            {
                "ignore": ["attribute", "class"]
            }
            
        ],
        "selector-max-id": [
            2
        ],
        "alpha-value-notation": "percentage"   ,
        
        "max-nesting-depth": 2
    }
  };
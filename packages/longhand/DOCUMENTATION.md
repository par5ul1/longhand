## Classes

<dl>
<dt><a href="#Longhand">Longhand</a></dt>
<dd><p>The Longhand class. Handles parsing CSS properties into their longhand equivalents.</p></dd>
<dt><a href="#LonghandStyle">LonghandStyle</a></dt>
<dd><p>The LonghandStyle class. Represents a parsed CSS property, its value, and all its longhand components.</p></dd>
</dl>

<a name="Longhand"></a>

## Longhand
<p>The Longhand class. Handles parsing CSS properties into their longhand equivalents.</p>

**Kind**: global class  

* [Longhand](#Longhand)
    * [new Longhand([options])](#new_Longhand_new)
    * _instance_
        * [.options](#Longhand+options) ⇒
        * [._getRawHTMLStyleWithPropertyAndValueApplied(property, value)](#Longhand+_getRawHTMLStyleWithPropertyAndValueApplied)
        * [.parse(property, value)](#Longhand+parse) ⇒
    * _static_
        * [.parse(options)](#Longhand.parse)

<a name="new_Longhand_new"></a>

### new Longhand([options])
<p>Creates a new instance of the Longhand class with the given options.</p>

**Returns**: [<code>Longhand</code>](#Longhand) - <p>The Longhand class instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>LonghandOptions</code> | <p>The [ options](LonghandOptions) for the Longhand class.</p> |

<a name="Longhand+options"></a>

### longhand.options ⇒
**Kind**: instance property of [<code>Longhand</code>](#Longhand)  
**Returns**: <p>The options for the Longhand class.</p>  
<a name="Longhand+_getRawHTMLStyleWithPropertyAndValueApplied"></a>

### longhand.\_getRawHTMLStyleWithPropertyAndValueApplied(property, value)
<p>Internal method for the Longhand class. Gets the raw HTML style with the given property and value applied.</p>

**Kind**: instance method of [<code>Longhand</code>](#Longhand)  
**Note**: This method is used internally by the [parse](parse) method. While it is public, it will likely never be used directly.  

| Param | Description |
| --- | --- |
| property | <p>The CSS property to apply.</p> |
| value | <p>The value to apply.</p> |

<a name="Longhand+parse"></a>

### longhand.parse(property, value) ⇒
<p>The parser method for the Longhand class. Parses a CSS property into its longhand equivalent, given a value.</p>

**Kind**: instance method of [<code>Longhand</code>](#Longhand)  
**Returns**: <p>The parsed style as an instance of the [LonghandStyle](#LonghandStyle) class.</p>  

| Param | Description |
| --- | --- |
| property | <p>The CSS property to parse. Can be a camelCase or kebab-case.</p> |
| value | <p>The value to parse.</p> |

<a name="Longhand.parse"></a>

### Longhand.parse(options)
<p>Static method for the [Longhand.prototype.parse](Longhand.prototype.parse) method.</p>

**Kind**: static method of [<code>Longhand</code>](#Longhand)  
**See**: [Longhand.prototype.parse](Longhand.prototype.parse)  

| Param | Description |
| --- | --- |
| options | <p>The [ options](LonghandOptions) for the Longhand class.</p> |

<a name="LonghandStyle"></a>

## LonghandStyle
<p>The LonghandStyle class. Represents a parsed CSS property, its value, and all its longhand components.</p>

**Kind**: global class  

* [LonghandStyle](#LonghandStyle)
    * [new LonghandStyle(originalProperty, originalValue, originalStyles)](#new_LonghandStyle_new)
    * [.originalProperty](#LonghandStyle+originalProperty) ⇒ <code>LonghandStylesProperty</code>
    * [.originalValue](#LonghandStyle+originalValue) ⇒ <code>string</code>
    * [.kebabCaseStyles](#LonghandStyle+kebabCaseStyles) ⇒
    * [.kebabCaseProperties](#LonghandStyle+kebabCaseProperties) ⇒ <code>Array.&lt;string&gt;</code>
    * [.camelCaseStyles](#LonghandStyle+camelCaseStyles) ⇒
    * [.camelCaseProperties](#LonghandStyle+camelCaseProperties) ⇒ <code>Array.&lt;string&gt;</code>
    * [.styles](#LonghandStyle+styles) ⇒
    * [.properties](#LonghandStyle+properties) ⇒ <code>Array.&lt;string&gt;</code>
    * [.length](#LonghandStyle+length) ⇒ <code>number</code>
    * [.isValidLonghandProperty(property)](#LonghandStyle+isValidLonghandProperty) ⇒ <code>boolean</code>
    * [.toString()](#LonghandStyle+toString) ⇒ <code>string</code>
    * [.toCamelCaseString()](#LonghandStyle+toCamelCaseString) ⇒ <code>string</code>
    * [.toKebabCaseString()](#LonghandStyle+toKebabCaseString) ⇒ <code>string</code>

<a name="new_LonghandStyle_new"></a>

### new LonghandStyle(originalProperty, originalValue, originalStyles)
<p>Creates a new instance of the LonghandStyle class.</p>

**Returns**: [<code>LonghandStyle</code>](#LonghandStyle) - <p>The LonghandStyle class instance.</p>  

| Param | Type | Description |
| --- | --- | --- |
| originalProperty | <code>LonghandStylesProperty</code> | <p>The original (shorthand) property of the parsed style.</p> |
| originalValue | <code>string</code> | <p>The original (shorthand) value of the parsed style.</p> |
| originalStyles | <code>LonghandStyles</code> | <p>The parsed [ styles](LonghandStyles).</p> |

<a name="LonghandStyle+originalProperty"></a>

### longhandStyle.originalProperty ⇒ <code>LonghandStylesProperty</code>
**Kind**: instance property of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <code>LonghandStylesProperty</code> - <p>The original (shorthand) property of the parsed style.</p>  
<a name="LonghandStyle+originalValue"></a>

### longhandStyle.originalValue ⇒ <code>string</code>
**Kind**: instance property of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <code>string</code> - <p>The original (shorthand) value of the parsed style.</p>  
<a name="LonghandStyle+kebabCaseStyles"></a>

### longhandStyle.kebabCaseStyles ⇒
**Kind**: instance property of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <p>The parsed longhand styles as a map of kebab-cased properties to their values</p><p>An empty map if the original property has no longhand equivalents.</p>  
<a name="LonghandStyle+kebabCaseProperties"></a>

### longhandStyle.kebabCaseProperties ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance property of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>The parsed longhand properties as an array of kebab-cased properties</p><p>An empty array if the original property has no longhand equivalents.</p>  
<a name="LonghandStyle+camelCaseStyles"></a>

### longhandStyle.camelCaseStyles ⇒
**Kind**: instance property of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <p>The parsed longhand styles as a map of camelCased properties to their values</p><p>An empty map if the original property has no longhand equivalents.</p>  
<a name="LonghandStyle+camelCaseProperties"></a>

### longhandStyle.camelCaseProperties ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance property of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>The parsed longhand properties as an array of camelCased properties</p><p>An empty array if the original property has no longhand equivalents.</p>  
<a name="LonghandStyle+styles"></a>

### longhandStyle.styles ⇒
**Kind**: instance property of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <p>The parsed longhand styles as a map of both camelCased and kebab-cased properties to their values</p><p>An empty map if the original property has no longhand equivalents.</p>  
<a name="LonghandStyle+properties"></a>

### longhandStyle.properties ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance property of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>The parsed longhand properties as an array of both camelCased and kebab-cased properties</p><p>An empty array if the original property has no longhand equivalents.</p>  
<a name="LonghandStyle+length"></a>

### longhandStyle.length ⇒ <code>number</code>
**Kind**: instance property of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <code>number</code> - <p>The length of the parsed longhand properties</p><p>0 if the original property has no longhand equivalents.</p>  
<a name="LonghandStyle+isValidLonghandProperty"></a>

### longhandStyle.isValidLonghandProperty(property) ⇒ <code>boolean</code>
<p>Checks if a property is a valid longhand property for the original property.</p>

**Kind**: instance method of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <code>boolean</code> - <p>Whether the property is a valid longhand property for the original property.</p>  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | <p>The property to check.</p> |

<a name="LonghandStyle+toString"></a>

### longhandStyle.toString() ⇒ <code>string</code>
<p>Converts and formats the parsed longhand styles to a string.</p>

**Kind**: instance method of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <code>string</code> - <p>The formatted string representation of the parsed longhand styles.</p>  
<a name="LonghandStyle+toCamelCaseString"></a>

### longhandStyle.toCamelCaseString() ⇒ <code>string</code>
<p>Converts and formats the parsed longhand styles to a camelCase string.</p>

**Kind**: instance method of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <code>string</code> - <p>The formatted camelCase string representation of the parsed longhand styles.</p>  
<a name="LonghandStyle+toKebabCaseString"></a>

### longhandStyle.toKebabCaseString() ⇒ <code>string</code>
<p>Converts and formats the parsed longhand styles to a kebab-case string.</p>

**Kind**: instance method of [<code>LonghandStyle</code>](#LonghandStyle)  
**Returns**: <code>string</code> - <p>The formatted kebab-case string representation of the parsed longhand styles.</p>  

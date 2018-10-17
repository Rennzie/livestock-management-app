# Stockman API Documentation

This documentation is light weight and does not include descriptions of standard `CRUD` end points as they are RESTful and should be relatively intuitive. It does include descriptions of all other request end points.

All requests to the `API` should begin with `/api`. Note this will change with the next version to rather include the version number: `v0.0.1`

<hr>

## Contents

* [Bovine Model](#bovine)
  * [Virtuals](#bovine-virtuals)
  * [Methods](#bovine-methods)
  * [End Points](#bovine-endpoints)


* [Herd Model](#herd)
  * [Virtuals](#herd-virtuals)
  * [Methods](#herd-methods)
  * [End Points](#herd-endpoints)


* [User Model](#user)
  * [Virtuals](#user-virtuals)
  * [Methods](#user-methods)
  * [End Points](#user-endpoints)

<hr>

## <a name="#bovine"></a>Bovine Model

Primary model for collecting information all Cattle.

### <a name="bovine-virtuals"></a> Virtuals

- `formattedBirthDate`

    Formats the `birthDate` which is a unix number into `ddd MMMM Do` format using moment.

### <a name="bovine-methods"></a> Methods

- `.addWeight()`

  Pushed an object containing new weight details into the animals `weights` array.

- `.togglePregnancy()`

  Will toggle the `breeding.isPregnant`.

- `.setBreedingStatus()`

  Set the status of `breeding.status` of an animal to `true`. This will usually only be set once.

- `.setFatteningStatus()`

  Set the status of `fattening.status` of an animal to `true`. This will usually only be set once.

### <a name="bovine-endpoints"></a> End Points

- `/bovines/categories`

  - `patch()`

  Used to change the category of a group of animals.

  Request requires: An object containing and array of `_ids` and the name of the `newCategory`

  The request returns an array containing all the updated animals.


- `/bovines/pregnant`

  - `patch()`

    Used to toggle the pregnancy status of a group of animals.

    Request Requires: An array of animal ids.

    The request makes use of the `togglePregnancy()` method and is not a direct setter. i.e if the current status is false it will become true and visa versa. It does not return anything.


- `/bovines/breeding`

  - `patch()`

    Used to set the `breeding.status` of a group on animals to true.

    Request requires: An array of animal `ids`

    The requests makes use of the `.setBreedingStatus()` method. It does not return anything.


- `/bovines/fattening`

  - `patch()`

    Used to set the `fattening.status` of a group on animals to true.

    Request requires: An array of animal `ids`

    The requests makes use of the `.setFatteningStatus()` method. It does not return anything


- `/bovines/:bovineId/weights`

  - `post()`

    For updating a single animals weight.

    Request requires: an `id` parameter in the `url` and a body with an object containing `weight` and `unit`.

    The request uses the `addWeight()` method to push the object into an animals `weights` array. It returns an object with animal whose weight has been changed.

- `/bovines/:id/breeding/production`

  - `post()`

  For updating a mothers production array with a newly registered calf.

  Request Requires: an object with a key of `calfId` and a value of the new calfs `id`.

  The request uses the `.addNewCalf()` method to push the id into the mother animals `breeding.production` array. It will also set the mothers `breeding.isPregnant` to false to simplify front end calf registration. 


- `/bovines/weights`
  - `post()`

    For bulk weight uploads via an .csv file import. Currently the .csv should be in the below format and delimited by commas:

    Request requires: `.csv`

    ```
    _id                      | weight | unit
    -------------------------|--------|-----
    5b91752666708bc8b1622721 | 400    | kgs
    5b91752666708bc8b1622706 | 400    | kgs
    5b91752666708bc8b1622707 | 350    | kgs
    ```

    `_id` is a reference the `Bovine Model`
    The request will update the weight array for all the given `_id`s with a new object containing the given weights and weight units. It does not return anything.

<hr>

## <a name="#herd"></a>Herd Model

This model act as a container for any type of animals. It relies primarily on the category division of herds. See Herd schema for more details. The model will eventually hold a number of virtuals which will be the core statistic generate for `Stockman`

### <a name="herd-virtuals"></a>Virtuals

### <a name="herd-methods"></a>Methods

- `.addAnimals()`

  Updates the animals array with the given array of animal `ids`. It ensures that animals are not duplicated within the animals array.

  Note: I may need to throw a validation error if this does occur?

- `.removeAnimals()`

  Updates the Herds animals array by filtering out all animals that are included in the given array argument.

### <a name="herd-endpoints"></a>End Points

- `/herds/:herdId/animals`

  - `patch()`

  Changing the herd of an animal

  Request Requires: An array of animal `ids` in the body

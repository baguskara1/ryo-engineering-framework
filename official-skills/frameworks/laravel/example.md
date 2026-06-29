# Examples

## Example 1: Eloquent Model with Relationships

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    protected $fillable = ['name', 'email'];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}
```

## Example 2: Controller with Form Request

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;

class UserController extends Controller
{
    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        return response()->json($user, 201);
    }
}
```

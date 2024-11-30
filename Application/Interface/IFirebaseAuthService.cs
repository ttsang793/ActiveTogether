using FirebaseAdmin.Auth;

namespace Application.Interface;

public interface IFirebaseAuthService
{
    Task<FirebaseToken> VerifyIdToken(string idToken);
}

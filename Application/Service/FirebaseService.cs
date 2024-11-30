using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using FirebaseAdmin.Auth;
using Application.Interface;

namespace Application.Service;

public class FirebaseAuthService : IFirebaseAuthService
{
    private static FirebaseApp? _firebaseApp;

    public FirebaseAuthService()
    {
        if (_firebaseApp == null)
        {
            _firebaseApp = FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("../json/serviceAccountKey.json")
            });
        }
    }

    public async Task<FirebaseToken> VerifyIdToken(string idToken)
    {
        try
        {
            var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            return decodedToken;
        }
        catch (Exception ex)
        {
            throw new UnauthorizedAccessException("Invalid Firebase ID token", ex);
        }
    }
}
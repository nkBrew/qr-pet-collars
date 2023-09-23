from rest_framework import serializers

from ..models import Collar


class CollarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collar
        fields = (
            'img_url',
            'pet_name',
            'breed',
            'weight',
            'owner_name',
            'owner_email',
            'phone_number',
            'qr_code_id',
        )

    def validate_qr_code_id(self, value):
        if Collar.objects.filter(qr_code_id=value).exists():
            raise serializers.ValidationError("you can't just _scan_ someone else's dog as your own...")
